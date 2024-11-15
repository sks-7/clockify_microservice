const taskSchema = `#graphql

scalar Date

type Task{
_id:ID!
name:String
tag:String
billable:Boolean
startAt:String
endAt:String
projectName: String
totalTime: String
createdAt: Date
updatedAt: Date
}

type Query{

    tasks:[Task],
}

type Mutation {
  createTasks(
    name: String,
    startAt: String,
    endAt: String,
    totalTime: String,
    tag: String,
    billable: Boolean
  ): Task


 deleteTask(_id:String):Task

#  updateTask(
#     _id: String!,
#     name: String!,
#     startAt: String!,
#     endAt: String!,
#     totalTime: String,
#     tag: String,
#     billable: Boolean
#   ): Task

}
`;

export { taskSchema };
