-- Insert sample skills
INSERT INTO skills (name, description, category, difficulty_level) VALUES
('Java', 'Object-oriented programming language', 'Programming', 'Intermediate'),
('Python', 'High-level programming language', 'Programming', 'Beginner'),
('JavaScript', 'Web programming language', 'Programming', 'Beginner'),
('React', 'JavaScript library for building UIs', 'Framework', 'Intermediate'),
('Spring Boot', 'Java framework for web applications', 'Framework', 'Intermediate'),
('SQL', 'Database query language', 'Database', 'Beginner'),
('Docker', 'Containerization platform', 'DevOps', 'Intermediate'),
('AWS', 'Cloud computing platform', 'Cloud', 'Advanced'),
('Git', 'Version control system', 'Tools', 'Beginner'),
('REST API', 'Web service architecture', 'Architecture', 'Intermediate');

-- Insert sample courses with real links
INSERT INTO courses (title, description, provider, course_url, difficulty_level, category, estimated_duration, rating, is_free) VALUES
('Java Programming Masterclass', 'Complete Java programming course covering basics to advanced concepts', 'Udemy', 'https://www.udemy.com/course/java-the-complete-java-developer-course/', 'Beginner', 'Programming', '80 hours', 4.6, false),
('Python for Everybody', 'Learn Python programming from scratch', 'Coursera', 'https://www.coursera.org/specializations/python', 'Beginner', 'Programming', '8 months', 4.8, true),
('React - The Complete Guide', 'Master React including Hooks, Redux, and Next.js', 'Udemy', 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', 'Intermediate', 'Web Development', '48 hours', 4.7, false),
('Spring Boot Tutorial', 'Learn Spring Boot framework for Java applications', 'YouTube', 'https://www.youtube.com/watch?v=vtPkZShrvXQ', 'Intermediate', 'Backend', '12 hours', 4.5, true),
('AWS Certified Solutions Architect', 'Prepare for AWS certification exam', 'Udemy', 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', 'Advanced', 'Cloud', '28 hours', 4.7, false),
('Docker Mastery', 'Complete Docker course from beginner to pro', 'Udemy', 'https://www.udemy.com/course/docker-mastery/', 'Intermediate', 'DevOps', '19 hours', 4.6, false),
('SQL for Data Science', 'Learn SQL for data analysis and databases', 'Coursera', 'https://www.coursera.org/learn/sql-for-data-science', 'Beginner', 'Database', '4 weeks', 4.6, true),
('Git and GitHub for Beginners', 'Master version control with Git', 'YouTube', 'https://www.youtube.com/watch?v=RGOj5yH7evk', 'Beginner', 'Tools', '1 hour', 4.8, true),
('RESTful Web Services', 'Build RESTful APIs with Spring Boot', 'Udemy', 'https://www.udemy.com/course/restful-web-services-with-spring-framework/', 'Intermediate', 'Backend', '16 hours', 4.5, false),
('Full Stack Web Development', 'Become a full stack developer', 'Coursera', 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer', 'Intermediate', 'Full Stack', '6 months', 4.7, false),
('JavaScript Algorithms and Data Structures', 'Master algorithms and data structures', 'freeCodeCamp', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'Intermediate', 'Programming', '300 hours', 4.9, true),
('Kubernetes for Beginners', 'Learn container orchestration with Kubernetes', 'Udemy', 'https://www.udemy.com/course/learn-kubernetes/', 'Intermediate', 'DevOps', '6 hours', 4.6, false),
('Machine Learning Specialization', 'Learn ML with Andrew Ng', 'Coursera', 'https://www.coursera.org/specializations/machine-learning-introduction', 'Advanced', 'AI/ML', '3 months', 4.9, false),
('Node.js - The Complete Guide', 'Master Node.js for backend development', 'Udemy', 'https://www.udemy.com/course/nodejs-the-complete-guide/', 'Intermediate', 'Backend', '40 hours', 4.7, false),
('Web Design for Beginners', 'Learn HTML, CSS, and responsive design', 'Coursera', 'https://www.coursera.org/learn/web-design', 'Beginner', 'Web Development', '4 weeks', 4.5, true);

-- Insert sample project ideas
INSERT INTO project_ideas (title, description, difficulty_level, required_skills, estimated_time, category, github_url, upvote_count) VALUES
('E-commerce REST API', 'Build a complete REST API for an e-commerce platform with user authentication, product management, and order processing', 'Intermediate', 'Java, Spring Boot, SQL, REST API', '2-3 weeks', 'Backend', 'https://github.com/topics/ecommerce-api', 125),
('Real-time Chat Application', 'Create a real-time chat app using WebSockets with user authentication and message history', 'Intermediate', 'JavaScript, React, Node.js, Socket.io', '1-2 weeks', 'Full Stack', 'https://github.com/topics/chat-application', 98),
('Task Management System', 'Build a Trello-like task management system with drag-and-drop functionality', 'Beginner', 'React, JavaScript, CSS, Local Storage', '1 week', 'Frontend', 'https://github.com/topics/task-manager', 87),
('Weather Dashboard', 'Create a weather dashboard using external APIs with location search and forecasts', 'Beginner', 'JavaScript, React, REST API', '3-5 days', 'Frontend', 'https://github.com/topics/weather-app', 156),
('Blog Platform with CMS', 'Develop a blogging platform with content management system and user roles', 'Intermediate', 'Java, Spring Boot, SQL, React', '3-4 weeks', 'Full Stack', 'https://github.com/topics/blog-platform', 112),
('Inventory Management System', 'Create an inventory tracking system with CRUD operations and reporting', 'Intermediate', 'Python, Django, PostgreSQL', '2 weeks', 'Backend', 'https://github.com/topics/inventory-management', 78),
('Social Media Dashboard', 'Build a dashboard to aggregate social media analytics', 'Advanced', 'React, Node.js, MongoDB, Chart.js', '4 weeks', 'Full Stack', 'https://github.com/topics/social-dashboard', 142),
('Microservices Architecture', 'Implement a microservices-based application with Docker and Kubernetes', 'Advanced', 'Java, Spring Boot, Docker, Kubernetes', '4-6 weeks', 'Backend', 'https://github.com/topics/microservices', 203);
