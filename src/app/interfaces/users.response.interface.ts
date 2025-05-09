import { User } from "../models/user.model";

export interface Response {
    ok:    boolean;
    msg:   string;
    users: Users;
}

export interface Users {
    docs:          User[];
    totalDocs:     number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      null;
    nextPage:      null;
}
