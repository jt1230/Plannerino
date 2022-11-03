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
            CreateMap<UserDto, User>();
            CreateMap<Event, EventDto>();
            CreateMap<EventDto, Event>();
            CreateMap<Group, GroupDto>();
            CreateMap<GroupDto, Group>();
            CreateMap<UserTask, UserTaskDto>();
            CreateMap<UserTaskDto, UserTask>();
        }
    }
}
