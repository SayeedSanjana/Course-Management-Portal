# Course Management Portal

## Overview

The **Course Management Portal** is a web application designed to facilitate communication, information sharing, and academic management within a university setting. This MVP version focuses on key features such as user authentication, faculty directory, advising information, course related information, grade management, and a simple homepage for student users.

This application follows the **Model-View-Controller (MVC)** architecture pattern. The backend is built with **Node.js** and **TypeScript**, while the frontend uses **React**, **Redux**, and **TailwindCSS** for styling. The database used is **PostgreSQL**, and the app is designed to be **SaaS-based** for scalability.

<img width="1913" height="914" alt="image" src="https://github.com/user-attachments/assets/e82e2c6b-4a71-429c-9563-424917c7b02d" />
<img width="1914" height="915" alt="image" src="https://github.com/user-attachments/assets/f3798370-0d0c-4f92-884f-0657cfda2230" />
<img width="1915" height="915" alt="image" src="https://github.com/user-attachments/assets/c8b1c9d8-abe5-42c4-9ada-d2e584c9d1c0" />
<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/da8eb140-d921-4125-82ca-0bbd83bbea98" />
<img width="1917" height="913" alt="image" src="https://github.com/user-attachments/assets/776e482c-c585-4e0b-a833-06af645f2b56" />
<img width="1914" height="917" alt="image" src="https://github.com/user-attachments/assets/4b72b530-ea2b-4b3f-a7b9-fade70247f4c" />


## Features

### Core Features (MVP):
1. **User Authentication**: 
   - Simplified login and signup system.
   - Secure password storage using hashing.
   - Basic input validation to prevent common security vulnerabilities.

2. **Faculty Directory**:
   - Displays a static list of faculty members with essential details (name, department, contact email).

3. **Advising Information**:
   - A placeholder page indicating advising information is available through official university channels.

4. **Grade Management**:
   - Displays a mock grade report for the logged-in user with hardcoded data.
   - Shows course names, grades, and GPA calculation.

5. **Homepage**:
   - Welcomes the logged-in user with links to the core features: Faculty Directory and Grade Report.

### Future Features:
- Chat functionality
- Real-time grade management
- Integrated advising details
- Recommendation system

## Tech Stack

- **Backend**: Node.js, TypeScript
- **Frontend**: React, Redux, HTML, CSS, TailwindCSS
- **Database**: PostgreSQL (with an option to use SQLite for simplicity)
- **Version Control**: Git, GitHub
- **SaaS**: Hosted on cloud platforms (e.g., Heroku, Netlify)

## Installation

### Prerequisites

1. **Node.js** installed on your machine (>= 14.x)
2. **PostgreSQL** installed or configured for use

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/university-hub.git
   cd university-hub
