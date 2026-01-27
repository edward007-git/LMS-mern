import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureDuration: { type: Number, required: true },
    lectureTitle: { type: String, required: true },
    lectureUrl: { type: String, required: true },
    isPreviewFree: { type: Boolean, required: true },
    lectureOrder: { type: Number, required: true },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    chapterTitle: { type: String, required: true },
    chapterContent: [lectureSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String }, 
    price: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },

    discount: { type: Number, min: 0, max: 100, default: 0 },

    courseContent: [chapterSchema],

    courseRatings: [
      {
        userId: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
      },
    ],

    educator: { type: String, ref: "User", required: true },

    enrolledStudents: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
