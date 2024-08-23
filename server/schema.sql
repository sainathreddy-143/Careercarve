-- schema.sql

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability TEXT,
    area_of_interest TEXT
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability TEXT,
    areas_of_expertise TEXT,
    is_premium BOOLEAN
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    mentor_id INTEGER,
    start_time DATETIME,
    end_time DATETIME,
    duration INTEGER,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(mentor_id) REFERENCES mentors(id)
);
