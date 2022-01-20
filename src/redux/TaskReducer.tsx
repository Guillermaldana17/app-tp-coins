export interface State {
    tasks: Array<string>;
}

const initialState: State = {
    tasks: []
}

const TaskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "TASK_ADD":
            return { ...state, favorites: [...state.tasks, action.payload] };
        default:
            return state;
    }
};
export default TaskReducer;
