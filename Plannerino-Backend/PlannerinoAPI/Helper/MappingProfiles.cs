using AutoMapper;
using PlannerinoAPI.Dto;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Event, EventDto>();
            CreateMap<Group, GroupDto>();
            CreateMap<UserTask, UserTaskDto>();
        }
    }
}
