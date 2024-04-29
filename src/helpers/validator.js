class Validator {
  static validateTaskInfo(taskInfo) {
    if (!taskInfo.title || !taskInfo.description) {
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
    return {
      status: true,
      message: "Validated successfully",
    };
  }
}

module.exports = Validator;
