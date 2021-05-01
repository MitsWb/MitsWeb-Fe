<p align="center"><img src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/logo.png"></p>

# MitsWeb

A web platform developed for our college to implement the missing features in the existing portal with effective and efficient utilization of resources to reduce cost.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e16b536d-64db-41c7-86dd-c29f1c48bc98/deploy-status)](https://app.netlify.com/sites/mitsweb/deploys)
![Heroku](http://heroku-badge.herokuapp.com/?app=mitsweb-be&style=flat&svg=1)
![GitHub closed issues](https://img.shields.io/github/issues-closed/MitsWb/MitsWeb-Fe?style=flat)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/MitsWb/MitsWeb-Fe?color=green?style=flat)

<img src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/mitswebDashboard.jpeg">

## 👨‍💻 What it does

There are separate dashboards for students, teachers, admin, and security. It is used by students to request leave applications, gate passes, access course materials, exam information, etc. Teachers can enter student marks, attendance, create exams, and approve requests for leave and gate passes. Admins have the privilege to assign roles to teachers like faculty advisors or heads of department. Admins can add new users. Multiple users can be added by uploading data through excel sheets. Security can scan the QR code generated for gate passes to verify and permit students to go outside the campus.

## 😍 Faculty Dashboard

<img src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/facultyDashboard.jpeg">

## 😎 Admin Dashboard

<img src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/adminDashboardLight.jpeg">

## 📱 Progressive WebApp

MitsWeb is now a Progressive WebApp for better accessibility and user experience. It allows users to install the app directly from the web to their desktops/home screens and provides the native app-like experience.

Being a fully responsive and compatible application, it provides users with the same experience across tablets, mobile devices, and desktops!

<p align="center">
  <img alt="Banner" src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/mobileView2.jpeg" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Login" src="https://raw.githubusercontent.com/arihant-2310/.github-images/main/mobileView1.jpeg" width="50%">
</p>

## ⚛ Tech Stack

- Frontend : ReactJS (JavaScript), Material UI, Tailwind CSS
- Backend : NodeJs (Javascript)
- Database : MongoDB
- Deployment and Resources Optimization : Google Cloud Platform (To be done!!)

## ✨ More About It

This is an ongoing project and in the next phase, our task is to implement report card generation, online fee payment, and manage new admissions.

## 💻 Run the project locally

- Clone the repo `https://github.com/MitsWb/MitsWeb-Fe.git`
- Run command to install all the dependencies `npm install`
- Create `.env` file in root folder and add required parameters
- Run `npm start`
- Navigate to `http://localhost:8000/`

## 🤔 Challenges

- The main challenges which we encountered while implementing it:
  - To connect all the schemas with each other.
  - To build logic to store infomation and retrieve it efficiently.
  - Navigating user and displaying content based on its type (Student, Faculty, Admin, Security Guard)
  - Implementing google signin and converting to progressive web app required some time and efforts.

## Credits 😀

- [Arihant Hirawat](https://github.com/arihant-2310)
- [Irfan Shereef](https://github.com/irfan-123)
- [Jishnu PS](https://github.com/psjishnu)
- [Udesh Udayakumar](https://github.com/pilotudesh)
