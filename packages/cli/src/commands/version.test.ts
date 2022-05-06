import axios from 'axios';
import fs from "fs-extra";
import { version } from "./version";

jest.mock('axios');
jest.mock('fs-extra');

describe('version command', () => {
    it('prints out CLI and API versions', async () => {
        // @ts-ignore
        axios.mockResolvedValueOnce({ data: "0.0.3" });
        // @ts-ignore
        fs.readFileSync.mockReturnValueOnce('{ "version": "0.0.3" }');
        console.log = jest.fn();

        await version();

        // fs.readFileSync should be called when getting the cli version
        expect(fs.readFileSync).toHaveBeenCalledTimes(1)
        // axios should be called when getting the api version
        expect(axios).toHaveBeenCalledTimes(1);
        // console.log should be called 4 times
        // 1 for title, 1 for banner, 1 for cli version, 1 for api version
        expect(console.log).toHaveBeenCalledTimes(4);
        // @ts-ignore
        expect(console.log.mock.calls[2][0]).toBe("CLI Version: 0.0.3");
        // @ts-ignore
        expect(console.log.mock.calls[3][0]).toBe("API Version: 0.0.3");
    });
});