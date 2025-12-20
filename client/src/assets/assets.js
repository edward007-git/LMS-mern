
import user_icon from "../assets/images/user.png";
import microsoft_logo from "../assets/images/Microsoft_logo_(2012).svg.png";
import walmart_logo from "../assets/images/Walmart_logo_(2008).svg.png";
import paypal_logo from "../assets/images/PayPal.svg.png";
import adobe_logo from "../assets/images/Adobe_Corporate_logo.svg.png";
import google_logo from "../assets/images/google-logo-transparent.svg.png";
import star from "../assets/images/star.svg";

export const assets = {
  user_icon,
  microsoft_logo,
  walmart_logo,
  paypal_logo,
  adobe_logo,
  google_logo,
  star,
};

export const dummyCourses = [
  {
    _id: "650a00000000000000000001",
    courseTitle: "Introduction to JavaScript",
    courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/hqdefault.jpg",
    educator: {
      id: "675ac1512100b91a6d9b8b24",
      name: "Sarah Mitchell",
      photo: "https://i.pravatar.cc/150?img=32",
    },
    courseDescription:
      "<h2>Learn the Basics of JavaScript</h2><p>Start building interactive web pages using vanilla JavaScript.</p>",
    coursePrice: 49.99,
    discount: 20,
    isPublished: true,
    courseRatings: [{ rating: 5 }, { rating: 4 }],
    studentsEnrolled: 2450,

    courseContent: [
      {
        chapterTitle: "Getting Started",
        chapterContent: [
          { lectureTitle: "What is JavaScript?", lectureDuration: 6, videoId: "CBWnBi-awSA" },
          { lectureTitle: "Setting Up Your Environment", lectureDuration: 8, videoId: "CBWnBi-awSA" },
          { lectureTitle: "Your First Script", lectureDuration: 10, videoId: "CBWnBi-awSA" },
        ],
      },
      {
        chapterTitle: "Core Basics",
        chapterContent: [
          { lectureTitle: "Variables & Data Types", lectureDuration: 14, videoId: "CBWnBi-awSA" },
          { lectureTitle: "Operators & Expressions", lectureDuration: 12, videoId: "CBWnBi-awSA" },
          { lectureTitle: "Control Flow (if, switch)", lectureDuration: 16, videoId: "CBWnBi-awSA" },
        ],
      },
      {
        chapterTitle: "Functions & DOM",
        chapterContent: [
          { lectureTitle: "Functions in JavaScript", lectureDuration: 15, videoId: "CBWnBi-awSA" },
          { lectureTitle: "Intro to DOM", lectureDuration: 18, videoId: "CBWnBi-awSA" },
        ],
      },
    ],
  },

  {
    _id: "650a00000000000000000002",
    courseTitle: "Python for Beginners",
    courseThumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    educator: {
      id: "675ac1512100b91a6d9b8b25",
      name: "David Harrison",
      photo: "https://i.pravatar.cc/150?img=12",
    },
    courseDescription:
      "<h2>Start Coding with Python</h2><p>Learn Python fundamentals and build small projects.</p>",
    coursePrice: 39.99,
    discount: 10,
    isPublished: true,
    courseRatings: [{ rating: 5 }],
    studentsEnrolled: 1800,

    courseContent: [
      {
        chapterTitle: "Introduction to Python",
        chapterContent: [
          { lectureTitle: "Why Python?", lectureDuration: 5, videoId: "rfscVS0vtbw" },
          { lectureTitle: "Installing Python & IDE", lectureDuration: 9, videoId: "rfscVS0vtbw" },
          { lectureTitle: "Your First Python Program", lectureDuration: 8, videoId: "rfscVS0vtbw" },
        ],
      },
      {
        chapterTitle: "Python Fundamentals",
        chapterContent: [
          { lectureTitle: "Variables & Input", lectureDuration: 12, videoId: "rfscVS0vtbw" },
          { lectureTitle: "Conditional Statements", lectureDuration: 15, videoId: "rfscVS0vtbw" },
          { lectureTitle: "Loops (for & while)", lectureDuration: 17, videoId: "rfscVS0vtbw" },
        ],
      },
      {
        chapterTitle: "Data Structures",
        chapterContent: [
          { lectureTitle: "Lists & Tuples", lectureDuration: 14, videoId: "rfscVS0vtbw" },
          { lectureTitle: "Dictionaries & Sets", lectureDuration: 16, videoId: "rfscVS0vtbw" },
        ],
      },
    ],
  },

  {
    _id: "650a00000000000000000003",
    courseTitle: "React JS — Complete Guide",
    courseThumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    educator: {
      id: "675ac1512100b91a6d9b8b26",
      name: "Emily Turner",
      photo: "https://i.pravatar.cc/150?img=47",
    },
    courseDescription:
      "<h2>Build Modern Web Apps with React</h2><p>Comprehensive React course including hooks, routing and state management.</p>",
    coursePrice: 69.99,
    discount: 25,
    isPublished: true,
    courseRatings: [{ rating: 5 }, { rating: 4 }],
    studentsEnrolled: 3200,

    courseContent: [
      {
        chapterTitle: "React Basics",
        chapterContent: [
          { lectureTitle: "What is React?", lectureDuration: 10, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "Creating a React App", lectureDuration: 12, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "JSX & Components", lectureDuration: 18, videoId: "Ke90Tje7VS0" },
        ],
      },
      {
        chapterTitle: "State & Props",
        chapterContent: [
          { lectureTitle: "Props in React", lectureDuration: 14, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "Managing State", lectureDuration: 20, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "Lifting State Up", lectureDuration: 16, videoId: "Ke90Tje7VS0" },
        ],
      },
      {
        chapterTitle: "Hooks & Advanced Topics",
        chapterContent: [
          { lectureTitle: "useState & useEffect", lectureDuration: 22, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "React Router Basics", lectureDuration: 20, videoId: "Ke90Tje7VS0" },
          { lectureTitle: "Context API", lectureDuration: 18, videoId: "Ke90Tje7VS0" },
        ],
      },
    ],
  },

  {
    _id: "650a00000000000000000004",
    courseTitle: "Node.js & Express.js Fundamentals",
    courseThumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
    educator: {
      id: "675ac1512100b91a6d9b8b27",
      name: "Michael Roberts",
      photo: "https://i.pravatar.cc/150?img=21",
    },
    courseDescription:
      "<h2>Backend Development with Node</h2><p>Build REST APIs using Node and Express with hands-on examples.</p>",
    coursePrice: 54.99,
    discount: 20,
    isPublished: true,
    courseRatings: [{ rating: 5 }],
    studentsEnrolled: 2809,

    courseContent: [
      {
        chapterTitle: "Node.js Basics",
        chapterContent: [
          { lectureTitle: "Intro to Node.js", lectureDuration: 9, videoId: "TlB_eWDSMt4" },
          { lectureTitle: "Node.js Architecture", lectureDuration: 11, videoId: "TlB_eWDSMt4" },
          { lectureTitle: "Working with npm", lectureDuration: 10, videoId: "TlB_eWDSMt4" },
        ],
      },
      {
        chapterTitle: "Express.js Fundamentals",
        chapterContent: [
          { lectureTitle: "What is Express?", lectureDuration: 12, videoId: "TlB_eWDSMt4" },
          { lectureTitle: "Routing in Express", lectureDuration: 18, videoId: "TlB_eWDSMt4" },
          { lectureTitle: "Middleware Basics", lectureDuration: 16, videoId: "TlB_eWDSMt4" },
        ],
      },
      {
        chapterTitle: "Building REST APIs",
        chapterContent: [
          { lectureTitle: "Creating REST Endpoints", lectureDuration: 20, videoId: "TlB_eWDSMt4" },
          { lectureTitle: "Connecting to Database", lectureDuration: 22, videoId: "TlB_eWDSMt4" },
        ],
      },
    ],
  },
];

// -----------------------------------------------------
// TESTIMONIALS
// -----------------------------------------------------
export const dummyTestimonial = [
  {
    name: "John Carter",
    role: "Full-Stack Developer",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
    feedback:
      "This platform completely transformed how I learn. The lessons are clear, structured, and full of real-world insights.",
  },
  {
    name: "Sarah Miller",
    role: "UI/UX Designer",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=47",
    feedback:
      "A fantastic learning experience! The layout, topics, and depth of content are perfect for anyone starting out.",
  },
  {
    name: "David Johnson",
    role: "Software Engineer",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=33",
    feedback:
      "Amazing platform! The examples and explanations helped me improve my development skills significantly.",
  },
  {
    name: "Emily Parker",
    role: "Data Analyst",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=56",
    feedback:
      "I loved the teaching style—simple, engaging, and practical. It boosted my confidence in data analysis.",
  },
];
