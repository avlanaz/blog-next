import getConfig from "next/config";
import { db } from 'lib/api'


// Select top level posts
// Get lists of user id in it
// Get ids of users that are not in it
db.posts.aggregate( [
    {$match:
        {
            $or: [
                { Forum: {$exists: false }},
                { Forum: {$eq: BsonNull.value}}
            ]
        }
    },
    {$lookup:
        {
            from: "users",
            localField: "CreatedBy",
            foreignField: "_id"
    }},
    {$group: {
        _id: "_id",
        Username: "$Username",
    }}

])


// Select top level posts
// Select those with no likes
// Select those with no comments
db.posts.aggregate([
    { $match: {
        $and: [
            { $and: [{Forum: {$exists: true}}, {Forum: {$neq: BsonNull.value}}]},
            { $or: [{Likeposts: {$size: 0}}, {Likeposts: {$eq: BsonNull.value}}]},
        ]
    }},
    { $project: {
        _id: 1, 
    }},
    {$lookup: {
        from: "posts",
        let: { postId: "$_id"},
        pipeline: {
            $match: {
                $expr: {
                    $eq: ["ParentId", "$$postId"]
                }
            }
        }
    }},
    { $group: {
        _id: "postId",
    }}
])




// 5
// List the posts numbers of likes
// Count the likes
// Sort by like count
// Lookup with join condition = most like count
/* db.posts.aggregate( [
    { $group: {
        _id: "_id",
        likeCount: {$size: "$Likeposts" }
    }},
    { $sort: {
        likeCount: -1,
    }}, 
    { $limit: 1},
    { $lookup: {
        from: "posts",
        pipeline: [
            { $group: {
                _id: "_id",
                postLikeCount: {$size: "$Likeposts" }
            }},
            { $match: {$eq: [""]}}
        ]
    }}
]) */

// try grouping after counting, with count as _id
db.posts.aggregate( [
    { $group: {
        _id: "_id",
        Content: "Content",
        likeCount: {$size: "$Likeposts" }
    }},
    { $group: {
        _id: likeCount,
        posts: {$push: "$$ROOT"},
    }},
    { $sort: {
        _id: -1
    }},
    { $limit: 1},
    { $unwind: "$posts"}
])



// 6
// Find TOP LEVEL POSTSlongest length of post
// Group them by length
// Display length, content, topic of forum, user full name

db.posts.aggregate ([
    { $match: {
        $and: [{Forum: { $exists: 1 }}, { Forum: {$neq: BsonNull.value}}]
    }},
    { $addFields: {
        length: { $strLenCP: "$Content" }
    }},
    { $group: {
        _id: "$length",
        posts: {$push: "$$ROOT"},
    }}, 
    { $sort: { _id: -1 }},
    { $limit: 1},
    { $unwind: "$sizes"},
    { $project: {_id: 0, Forum: 1, Content: 1, length: 1}},
    { $lookup: {
        from: "forums",
        localField: "Forum",
        foreignField: "_id",
    }},
    { $lookup: {
        from: "users",
        localField: "CreatedBy",
        foreignField: "_id"
    }},
    { $addFields: {
        fullname: {$concat: [ "$Firstname", " ", "$Lastname"]}
    }}, {$project: {
        Topic: 1, Content: 1, length: 1, fullname: 1
    }}
])



// 7
// Find all students
// Calculate duration of friendships
// Find ALL pairs w/ shortest duration
// Display in studentId1, studentId2, 
db.users.aggregate( [
    { $match : {
        UserType: { $eq: "Student" }
    }},
    { $project: { _id: 1, Friends: 1 }},
    { $unwind: "$Friends"},

    // here the document only contains original student id and the friend documents
    { $addFields: {
        friendDuration: {$substract: ["$$WhenUnfriended", "$WhenConfirmed"] }
    }},
    { $group: {
        _id: "$friendDuration",
        studentIds: { $push: {student1Id: "$_id", student2Id: "$FriendId"}},
    }},
    { $sort: { _id: 1 }},
    { $limit: 1},
    { $unwind: "$studentIds"},
])


// 8
// For every likepost's post
// Count its likeposts-1
// display userId, post's likes-1, postId
db.posts.aggregate([
    { $project: {
        _id: 1,
        postId: "$_id",
        userId: "$CreatedBy",
        countOtherLikes: { $substract: [ { $size: "$Likeposts"}, 1 ]},
        Likeposts: 1,
    }},
    { $unwind: "$Likeposts" },
])


// 9 
// Find students whose posts has the most like:
// Group posts by user id, counting likeposts
// Lookup with student, condition UserType = Student
// Sort by likecount, limit by 1
// Then
// Unwind Friends
// Lookup with friendId = userId AND friendDegree = userDegree 
// AND has valid WhenConfirmed AND has no WhenUnfriended
// Return all friends' userIds



// 10
// Find all replied to posts
// Match all posts with valid Forum
// Lookup user with CreatedBy = UserId AND UserType = "Student"
// 

db.users.aggregate( [
    { $lookup:
        {
            from: "posts",
            localField: "_id",
            foreignField: "CreatedBy",
            pipeline: [
                
            ]
        }
    }
])