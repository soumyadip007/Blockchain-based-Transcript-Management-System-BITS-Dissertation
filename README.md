# Blockchain-based-Transcript-Management-System-BITS-Dissertation\

## Create Student

```
curl --location 'http://localhost:5000/api/admin/student' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
  "student_id": "STU2024001",
  "name": "John Doe",
  "email": "johndoe1@example.com",
  "password": "securePassword123",
  "dob": "2000-05-15",
  "address": "123 Elm Street, Springfield, IL, 62704",
  "phone_number": "+1-555-123-4567",
  "enrollment_year": "2023",
  "course": "Computer Science",
  "semesters": [
    {
      "semester_number": 1,
      "subjects": [
        {
          "subject_name": "Introduction to Programming",
          "marks": 85,
          "grade": "A"
        },
        {
          "subject_name": "Mathematics I",
          "marks": 78,
          "grade": "B+"
        }
      ]
    },
    {
      "semester_number": 2,
      "subjects": [
        {
          "subject_name": "Data Structures",
          "marks": 88,
          "grade": "A"
        },
        {
          "subject_name": "Computer Networks",
          "marks": 82,
          "grade": "A-"
        }
      ]
    }
  ]
}
'
```

## Create Block

```
curl --location 'http://localhost:5000/api/admin/student/STU2024001/transcript' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "transcript_id": "TRANS2024001",
  "student_id": "STU2024001",
  "details": "John Doe'\''s academic performance for the first two semesters in the Computer Science course. The transcript includes subjects such as Introduction to Programming, Mathematics I, Data Structures, and Computer Networks, along with corresponding grades and marks.",
  "block_details": "0x5eD3aF6C8B9f1E9aBb2A9bD9c3d6A5C5f8E7cF9b"
}
'
```