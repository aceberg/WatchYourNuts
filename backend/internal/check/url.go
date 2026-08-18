package check

import (
	"log"
	"net/http"
)

// URL sends GET request to link
func URL(name, link string) bool {
	var ok bool

	resp, err := http.Get(link)
	if ok = !IfError(err); ok {
		log.Println("[INFO] GET request about", name, "to", link)
	}

	err = resp.Body.Close()
	IfError(err)

	return ok
}
