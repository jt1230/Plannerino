namespace PlannerinoAPI.Dto
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Type { get; set; } = "";
        public bool AllDay { get; set; } = false;
        public DateTime Start { get; set; } = DateTime.Now;
        public DateTime End { get; set; } = DateTime.Now;
    }
}