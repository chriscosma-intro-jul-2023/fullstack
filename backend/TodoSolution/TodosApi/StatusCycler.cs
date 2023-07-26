using TodosApi.Services;

namespace TodosApi
{
    public class StatusCycler : IProvideStatusCycling
    {
        public TodoListItemResponseModel ProvideNextStatusFrom(TodoListItemResponseModel savedItem)
        {
            return savedItem.Status switch
            {
                TodoItemStatus.Later => savedItem with { Status = TodoItemStatus.Now },
                TodoItemStatus.Now => savedItem with { Status = TodoItemStatus.Waiting },
                TodoItemStatus.Waiting => savedItem with { Status = TodoItemStatus.Completed },
                TodoItemStatus.Completed => savedItem with { Status = TodoItemStatus.Later },
                _ => savedItem,
            };
        }
    }
}