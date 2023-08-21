import mongoose, { InferSchemaType } from "mongoose";

const TodoSchema = new mongoose.Schema({
  description: String,
  isDone: {type: Boolean, default: false}
})


export const Todo = mongoose.model("Todo", TodoSchema)
export type TodoType = InferSchemaType<typeof TodoSchema>
