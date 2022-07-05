import axios from "axios";

test("Should register user", async () => {
  expect(
    async () => await axios.post("http://localhost:3000/auth/register", {})
  ).toThrowError();
});
