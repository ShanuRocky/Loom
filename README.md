# Loom - A Zoom Clone

Loom is a fully-featured video conferencing web application that replicates core functionalities of Zoom, including video streaming, screen sharing, meeting scheduling, and recording. Built using **Next.js** and styled with **TailwindCSS** and **shadcn UI**, Loom offers a modern, responsive, and user-friendly interface for virtual meetings and collaboration.

---

## 🌟 Features

### Core Functionalities
- **Authentication**: Secure **sign-in/sign-up** implemented using [Clerk Auth](https://clerk.dev/).
- **Video Streaming**: High-quality video streaming powered by [Stream](https://getstream.io/).
- **Recording and Screen Sharing**: Easily record meetings or share your screen for collaboration.
- **Layout Adjustment**: Adjustable grid layouts to suit your meeting preferences.
- **Personal Meeting Rooms**: Create and join private meeting rooms.

### Meeting Management
- **Schedule Meetings**: Set up and manage scheduled meetings.
- **Past Meetings**: Access previous meeting details and recordings.
- **Home and Dashboard**: A dedicated homepage and dashboard for quick navigation.

### Responsive Design
- **Sidebar and Navbar**: Includes a sidebar and navbar for seamless navigation.
- **Mobile-Friendly UI**: Sidebar automatically hides on smaller screens for a clean, responsive design.

### Pages
1. **Home Page**: Central hub for navigation.
2. **Recordings Page**: Access all meeting recordings.
3. **Scheduled Meetings Page**: View and manage your upcoming meetings.
4. **Meeting Page (`/meeting/[id]`)**: Join specific meetings via dynamic URLs.
5. **Personal Meeting Page**: Dedicated section for personal rooms.

---
## 📸 Screenshots

### HomePage 
<img width="1468" alt="Screenshot 2024-12-18 at 2 56 04 PM" src="https://github.com/user-attachments/assets/fd15fd20-7fd2-4263-9a81-f4604bbe06d8" />

### MeetingRoom
<img width="1470" alt="Screenshot 2024-12-18 at 5 45 07 PM" src="https://github.com/user-attachments/assets/01e4fb9c-0d63-497f-a29c-7d0b57b6429e" />

### RecordingsPage
<img width="1463" alt="Screenshot 2024-12-18 at 3 14 42 PM" src="https://github.com/user-attachments/assets/887e31ac-2bad-4295-b5ee-f648219173b5" />

### Mobile View
<img width="489" alt="Screenshot 2024-12-18 at 3 16 51 PM" src="https://github.com/user-attachments/assets/d6928885-bd2a-4112-b5ba-62f8fdfae07d" />

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [shadcn UI](https://ui.shadcn.dev/)

### Backend
- **Real-time Video Streaming**: [Stream SDK](https://getstream.io/), [Stream Video React SDK](https://getstream.io/video-react/)
- **Authentication**: [Clerk](https://clerk.dev/)

### Other Libraries
- **Radix UI**: For accessible and composable components.
- **Framer Motion**: For animations.
- **Lucide-React**: Icon library.
- **React Datepicker**: For scheduling functionalities.

---

## 🚀 Getting Started

Follow these steps to set up Loom on your local machine.

### Prerequisites

Ensure you have the following installed:
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShanuRocky/Loom.git

2. Navigate to the project directory:
   ```bash
   cd Loom

3. Install dependencies:
   ```bash
   npm install

4. Set up environment variables for Clerk and Stream:
- Create a .env.local file in the root directory.
- Add the following variables:

     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
     CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_STREAM_API_KEY=YOUR_STREAM_API_KEY
     STREAM_SECRET_KEY=YOUR_STREAM_SECRET_KEY
     NEXT_PUBLIC_BASE_URL=https://localhost:3000


5. Start the development server:
   ```bash
   npm run dev

## Live Demo

Visit the live version of the project: [Loom](https://loom-wine.vercel.app/)


✨ Acknowledgments
- Clerk Auth for authentication.
- Stream for video and chat capabilities.
- Next.js for its powerful web framework.
- Radix UI for accessible components.
- TailwindCSS for modern styling.



