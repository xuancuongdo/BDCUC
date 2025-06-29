using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CanhBaoApp.hubs
{
    public class CanhBaoHubs : Hub
    {
        public async Task GetMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}