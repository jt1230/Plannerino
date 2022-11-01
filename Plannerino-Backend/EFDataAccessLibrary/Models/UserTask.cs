﻿namespace EFDataAccessLibrary.Models
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Category { get; set; } = "";
        public string Description { get; set; } = "";
        public bool IsCompleted { get; set; }
        public User User { get; set; } = new User();

    }
}
