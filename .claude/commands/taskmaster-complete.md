Complete a Task Master task: $ARGUMENTS

Steps:

1. Use `get_task` MCP tool to review the current task with ID: $ARGUMENTS
2. Verify all implementation is complete and requirements are met
3. Run any tests related to this task (npm run test, lint, build, etc.)
4. Use `set_task_status` MCP tool to mark as complete: --id=$ARGUMENTS --status=done
5. Use `next_task` MCP tool to show the next available task
6. Provide a brief summary of what was completed