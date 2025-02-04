import axios from "axios";
import {useError} from "../store/error.js";

export default async function $api(uri, method = "GET", data = {}, showErrorPage = true) {
    const error = useError()
    try {
        const result = await axios.request({
            url: `/proxy?uri=${uri}`,
            method: method,
            data: data
        })
        return result.data
    } catch (err) {
        if (showErrorPage) error.showError(err.response.data.message)
        return err.response.data
    }
}