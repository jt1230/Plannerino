﻿namespace PlannerinoAPI.Dto
{
    public class GroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Avatar { get; set; } = "";
        public int Count { get; set; } = 0;
    }
}