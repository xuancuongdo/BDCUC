using AutoMapper;
using CanhBaoApp.Entities;

namespace CanhBaoApp.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<User, UserModelAdd>().ReverseMap();
            CreateMap<UserModel, UserModelAdd>().ReverseMap();
            CreateMap<UserModel, UserModelUpdate>().ReverseMap();
            CreateMap<Location, LocationModel>().ReverseMap();
            CreateMap<User, UserModelUpdate>().ReverseMap();
            CreateMap<ToaDoItrf, ToaDoItrfModel>().ReverseMap();
        }
    }
}
