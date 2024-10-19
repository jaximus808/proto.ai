package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func main() {
	err := godotenv.Load()
	app := fiber.New()

	if err != nil {
		log.Fatal("Error loading .env key")
	}
	api_key := os.Getenv("API_KEY")
	//initializing the gemini
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(api_key))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	model := client.GenerativeModel("gemini-1.5-flash")
	model.ResponseMIMEType = "application/json"
	// Specify the schema.
	model.ResponseSchema = &genai.Schema{
		Type:  genai.TypeArray,
		Items: &genai.Schema{Type: genai.TypeString},
	}
	app.Post("/generate", func(c *fiber.Ctx) error {
		type Message struct {
			Prompt string `json:"prompt"`
		}
		m := new(Message)

		if err := c.BodyParser(m); err != nil {
			return c.Status(400).JSON(&fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		resp, err := model.GenerateContent(ctx, genai.Text(m.Prompt))
		if err != nil {
			return c.Status(400).JSON(&fiber.Map{
				"success": false,
				"error":   err,
			})
		}

		ans := ""
		for _, part := range resp.Candidates[0].Content.Parts {
			if txt, ok := part.(genai.Text); ok {
				var recipes []string
				if err := json.Unmarshal([]byte(txt), &recipes); err != nil {
					log.Fatal(err)
				}
				fmt.Println(recipes[0])
				for _, s := range recipes {
					ans += s
				}
			}
		}
		return c.Status(200).JSON(&fiber.Map{
			"success": true,
			"message": ans,
		})
	})

	log.Fatal(app.Listen(":4000"))
	// resp, err := model.GenerateContent(ctx, genai.Text("Write a story about a magic backpack."))
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, part := range resp.Candidates {
	// 	fmt.Println(part.Content)
	// }

}
