package check

import (
	"log"
	"net/http"
)

// URL sends DELETE request to link
func URL(name, link string) bool {
	var ok bool

	req, err := http.NewRequest(http.MethodDelete, link, nil)
	if IfError(err) {
		return false
	}

	resp, err := http.DefaultClient.Do(req)
	if ok = !IfError(err); ok {
		log.Println("[INFO] DELETE request about", name, "to", link)
	}
	if resp != nil {
		err = resp.Body.Close()
		IfError(err)
	}

	return ok
}
