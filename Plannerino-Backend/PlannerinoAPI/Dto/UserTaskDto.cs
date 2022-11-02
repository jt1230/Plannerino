﻿namespace PlannerinoAPI.Dto
{
    public class UserTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Category { get; set; } = "";
        public string Description { get; set; } = "";
        public bool IsCompleted { get; set; }
    }
}