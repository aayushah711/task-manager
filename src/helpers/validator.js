class Validator {
  static validateTaskInfo(taskInfo) {
    if (!taskInfo.title || !taskInfo.description || !taskInfo.priority) {
      return {
        status: false,
        message: "Task info is malformed, please provide all the parameters",
      };
    }
    if (
      !taskInfo.hasOwnProperty("completed") ||
      typeof taskInfo.completed !== "boolean"
    ) {
      return {
        status: false,
        message: "Please provide completed key as boolean",
      };
    }
    if (!["low", "medium", "high"].includes(taskInfo.priority)) {
      return {
        status: false,
        message: "Priority can either be 'low', 'medium' or 'high'",
      };
    }
    return {
      status: true,
      message: "Validated successfully",
    };
  }

  static validateTaskPriorityLevel(taskPriorityLevel) {
    if (["low", "medium", "high"].includes(taskPriorityLevel)) {
      return {
        status: true,
        message: "Validated successfully",
      };
    }
    return {
      status: false,
      message: "Please provide task priority level",
    };
  }
}

module.exports = Validator;
