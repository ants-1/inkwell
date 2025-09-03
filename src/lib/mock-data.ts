import { Team } from "@/types/Team";
import { Note } from "../types/Note";

export const mockNotesData: Note[] = [
  {
    author: "MaxPower20",
    content: "This is a test note",
    date: "Sun 31 Aug 10:00",
    tags: ["Test", "First Note"],
  },
  {
    author: "MaxPower20",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae velit tellus. Quisque et lobortis leo. Suspendisse nulla ipsum, imperdiet at dapibus quis, dignissim vel enim. Aenean urna purus, luctus vel fermentum eget, faucibus non tellus. Nam faucibus diam nec odio pellentesque accumsan. Aliquam mi libero, sagittis venenatis scelerisque non, semper ut ligula. Curabitur consequat semper tortor vitae pretium. Donec at hendrerit tellus. Praesent eu tellus eget tellus varius laoreet sit amet et neque. Morbi porttitor tempor iaculis. Pellentesque sollicitudin, nibh vitae faucibus commodo, dui nulla sagittis urna, at bibendum urna odio vitae felis",
    date: "Sun 31 Aug 10:00",
    tags: ["Test", "First Note"],
  },
  {
    author: "MaxPower20",
    content: "This is a test note",
    date: "Sun 31 Aug 10:00",
    tags: ["Test", "First Note"],
  },
  {
    author: "MaxPower20",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae velit tellus. Quisque et lobortis leo. Suspendisse nulla ipsum, imperdiet at dapibus quis, dignissim vel enim. Aenean urna purus, luctus vel fermentum eget, faucibus non tellus. Nam faucibus diam nec odio pellentesque accumsan. Aliquam mi libero, sagittis venenatis scelerisque non, semper ut ligula. Curabitur consequat semper tortor vitae pretium. Donec at hendrerit tellus. Praesent eu tellus eget tellus varius laoreet sit amet et neque. Morbi porttitor tempor iaculis. Pellentesque sollicitudin, nibh vitae faucibus commodo, dui nulla sagittis urna, at bibendum urna odio vitae felis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae velit tellus. Quisque et lobortis leo. Suspendisse nulla ipsum, imperdiet at dapibus quis, dignissim vel enim. Aenean urna purus, luctus vel fermentum eget, faucibus non tellus. Nam faucibus diam nec odio pellentesque accumsan. Aliquam mi libero, sagittis venenatis scelerisque non, semper ut ligula. Curabitur consequat semper tortor vitae pretium. Donec at hendrerit tellus. Praesent eu tellus eget tellus varius laoreet sit amet et neque. Morbi porttitor tempor iaculis. Pellentesque sollicitudin, nibh vitae faucibus commodo, dui nulla sagittis urna, at bibendum urna odio vitae felis",
    date: "Sun 31 Aug 10:00",
    tags: ["Test", "First Note"],
  },
];

export const mockTeamsData: Team[] = [
  {
    name: "My Team",
    members: [
      { name: "MaxPower20" },
    ],
    folders: [
      {
        name: "First Folder",
        notes: mockNotesData
      },
      {
        name: "Second Folder",
        notes: mockNotesData
      }
    ]
  },
  {
    name: "Work Team",
    members: [
      { name: "MaxPower20" },
      { name: "BillyBob" }
    ],
    folders: [
      {
        name: "First Folder",
        notes: mockNotesData
      },
      {
        name: "Second Folder",
        notes: []
      }
    ]
  }
];