Find the next available Task Master task and show its details.

Steps:

1. Run `get_tasks` MCP tool to list all current tasks with status
2. Use `next_task` MCP tool to get the next available task
3. If a task is available, use `get_task` MCP tool for full details
4. Provide a summary of what needs to be implemented
5. Suggest the first implementation step
6. Set task status to 'in-progress' using `set_task_status` if ready to start