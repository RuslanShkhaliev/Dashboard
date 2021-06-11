import {$axios} from "../../../../plugins/api";

export const api = {
    getUsers: ({page, pp}) => (
        $axios.get(`/people?pp=${pp}&p=${page}`)
    ),
    getUser: id => $axios.get(`/people/${id}`),
}