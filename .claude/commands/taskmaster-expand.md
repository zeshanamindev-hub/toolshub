Expand a Task Master task into subtasks: $ARGUMENTS

Steps:

1. Use `get_task` MCP tool to understand the task with ID: $ARGUMENTS
2. Analyze the task complexity and scope
3. Use `expand_task` MCP tool with research enabled: --id=$ARGUMENTS --research
4. Review the generated subtasks for completeness
5. If needed, use `add_subtask` to add any missing subtasks
6. Use `get_task` again to show the expanded task structure