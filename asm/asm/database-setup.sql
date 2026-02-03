-- FU News Management System - Database Setup Script
-- This script creates initial data for testing

USE A2StudentName_ClassCode;
GO

-- Insert Admin Account
-- Password: admin123
INSERT INTO SystemAccount (AccountName, AccountEmail, AccountRole, AccountPassword)
VALUES ('Admin User', 'admin@example.com', 1, 'admin123');

-- Insert Staff Accounts
-- Password: staff123
INSERT INTO SystemAccount (AccountName, AccountEmail, AccountRole, AccountPassword)
VALUES ('John Smith', 'john.smith@example.com', 2, 'staff123');

INSERT INTO SystemAccount (AccountName, AccountEmail, AccountRole, AccountPassword)
VALUES ('Jane Doe', 'jane.doe@example.com', 2, 'staff123');

-- Insert Categories
INSERT INTO Category (CategoryName, CategoryDescription, ParentCategoryID, IsActive)
VALUES 
('Education', 'News related to education and academic activities', NULL, 1),
('Sports', 'Sports events and activities', NULL, 1),
('Technology', 'Technology and innovation news', NULL, 1),
('Events', 'University events and announcements', NULL, 1),
('Student Life', 'Student activities and achievements', NULL, 1);

-- Insert Tags
INSERT INTO Tag (TagName, Note)
VALUES 
('Important', 'Important announcements'),
('Featured', 'Featured articles'),
('Breaking', 'Breaking news'),
('Competition', 'Competition related'),
('Achievement', 'Student achievements'),
('Workshop', 'Workshop and training'),
('Scholarship', 'Scholarship information'),
('Research', 'Research related news');

-- Insert Sample News Articles
-- Note: Replace CreatedByID with actual account IDs from SystemAccount table
DECLARE @StaffID INT;
SELECT @StaffID = AccountID FROM SystemAccount WHERE AccountEmail = 'john.smith@example.com';

DECLARE @EduCatID INT, @SportsCatID INT, @TechCatID INT;
SELECT @EduCatID = CategoryID FROM Category WHERE CategoryName = 'Education';
SELECT @SportsCatID = CategoryID FROM Category WHERE CategoryName = 'Sports';
SELECT @TechCatID = CategoryID FROM Category WHERE CategoryName = 'Technology';

INSERT INTO NewsArticle (NewsTitle, Headline, NewsContent, NewsSource, CategoryID, NewsStatus, CreatedByID, CreatedDate)
VALUES 
('New Semester Registration Opens', 
 'Students can now register for the upcoming semester starting next week',
 'The registration portal for the Fall 2026 semester is now open. All students are advised to register early to secure their preferred courses and schedules. The registration period will run from February 5 to February 20, 2026.',
 'Academic Affairs Office',
 @EduCatID,
 1,
 @StaffID,
 GETDATE()),

('Annual Sports Festival 2026', 
 'Join us for the biggest sports event of the year with exciting competitions and prizes',
 'The Annual Sports Festival will take place from March 1-5, 2026. Events include basketball, volleyball, badminton, and track and field. All students and staff are encouraged to participate. Registration forms are available at the Sports Center.',
 'Sports Department',
 @SportsCatID,
 1,
 @StaffID,
 GETDATE()),

('Tech Innovation Showcase', 
 'Students present groundbreaking technology projects at annual showcase',
 'The Technology Department will host the annual Innovation Showcase on February 15, 2026. Students will demonstrate their latest projects in AI, IoT, and software development. Industry experts will be present to provide feedback and networking opportunities.',
 'Technology Department',
 @TechCatID,
 1,
 @StaffID,
 GETDATE());

-- Insert sample NewsTag relationships
DECLARE @NewsID1 INT, @NewsID2 INT, @NewsID3 INT;
DECLARE @TagImportant INT, @TagFeatured INT, @TagCompetition INT;

SELECT @NewsID1 = NewsArticleID FROM NewsArticle WHERE NewsTitle = 'New Semester Registration Opens';
SELECT @NewsID2 = NewsArticleID FROM NewsArticle WHERE NewsTitle = 'Annual Sports Festival 2026';
SELECT @NewsID3 = NewsArticleID FROM NewsArticle WHERE NewsTitle = 'Tech Innovation Showcase';

SELECT @TagImportant = TagID FROM Tag WHERE TagName = 'Important';
SELECT @TagFeatured = TagID FROM Tag WHERE TagName = 'Featured';
SELECT @TagCompetition = TagID FROM Tag WHERE TagName = 'Competition';

IF @NewsID1 IS NOT NULL AND @TagImportant IS NOT NULL
    INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (@NewsID1, @TagImportant);

IF @NewsID1 IS NOT NULL AND @TagFeatured IS NOT NULL
    INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (@NewsID1, @TagFeatured);

IF @NewsID2 IS NOT NULL AND @TagCompetition IS NOT NULL
    INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (@NewsID2, @TagCompetition);

IF @NewsID2 IS NOT NULL AND @TagFeatured IS NOT NULL
    INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (@NewsID2, @TagFeatured);

IF @NewsID3 IS NOT NULL AND @TagFeatured IS NOT NULL
    INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (@NewsID3, @TagFeatured);

GO

-- Verify data
SELECT 'Accounts Created' as Info, COUNT(*) as Count FROM SystemAccount;
SELECT 'Categories Created' as Info, COUNT(*) as Count FROM Category;
SELECT 'Tags Created' as Info, COUNT(*) as Count FROM Tag;
SELECT 'News Articles Created' as Info, COUNT(*) as Count FROM NewsArticle;
SELECT 'News Tags Created' as Info, COUNT(*) as Count FROM NewsTag;

-- Display login credentials
SELECT 
    'Login Credentials' as Info,
    AccountEmail as Email,
    AccountPassword as Password,
    CASE AccountRole WHEN 1 THEN 'Admin' ELSE 'Staff' END as Role
FROM SystemAccount;
