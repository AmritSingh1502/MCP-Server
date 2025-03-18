import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
    name: "Whether Fetching ",
    version: "1.0.0"
  });

  async function getWeatherByCity(city) {
    if(city.toLowerCase() === 'patna'){
        return { temp : '30C', forcast: 'chances of high rain'};
    }

    if(city.toLowerCase() === 'delhi'){
        return { temp : '40C', forcast: 'chances of warm winds'};
    }
    return { temp: null , error : 'unable to get Data'};
  }

  
  server.tool('getWeatherDataByCityName', {
    city: z.string(),
  }, async ({ city }) => {
    return {
      content: [
        {type: 'text', text: JSON.stringify(await getWeatherByCity(city))},
      ],
    };
  });
  

 async  function init(){
    const transport = new StdioServerTransport();
    await server.connect(transport);
 }

 init();