import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import prismaDatabase from "./database";

type IUserDTO = {
  name: string;
  username: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name, username } = JSON.parse(event.body!) as IUserDTO;

  const result = await prismaDatabase.user.create({
    data: {
      name,
      username
    }
  });

  return {
    statusCode: 201,
    body: JSON.stringify(result),
    headers: {
      "Content-Type": "application/json",
    },
  }

}