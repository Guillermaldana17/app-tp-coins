export enum Priority {
    HIGH = "High",
    MEDIUM = "Medium",
    LOW = "Low"
}

export enum Tags {
    HOME,
    WORK,
    FAMILY,
    PETS
}

export interface ITag {
    show: string,
    key: Tags,
    color: string
}

export interface Task {
    priority: string;
    name: string;
    finished: boolean;
    tags: Array<number>;
    id?: string;
    userId?: string;
}