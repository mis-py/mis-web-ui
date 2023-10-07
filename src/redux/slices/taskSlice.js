import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task_id: "",
  trigger: {
    interval: "",
    cron: []
  },
  trigger_default: {},
  extra_params: {},
  extra_params_default: {},
  task_type: "",
  task_name: "",
  task_module: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskToStart: (state, action) => {
      state.task_id = action.payload.id;
      state.trigger_default = action.payload.trigger;
      state.extra_params_default = action.payload.extra_typed;
      state.task_type = action.payload.type;
      state.task_name = action.payload.name;
      state.task_module = action.payload.module;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setExtraParams: (state, action) => {
      state.extra_params = action.payload;
    },
    resetTask: (state, action) => {
      state.task_id ="";
      state.trigger = {
        interval: "",
        cron: []
      };
      state.trigger_default = {}
      state.extra_params = {};
      state.extra_params_default = {}
      state.extra_typed = {};
      state.task_type = "";
      state.task_name = "";
      state.task_module = "";
    }
  },
});

export const {
  taskToStart,
  setTrigger,
  setExtraParams,
  resetTask
} = taskSlice.actions;

export default taskSlice.reducer;