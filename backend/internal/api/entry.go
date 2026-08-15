package api

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/gdb"
	"github.com/aceberg/WatchYourNuts/internal/models"
)

func deleteEntry(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		err := gdb.DeleteEntry(id)
		check.IfError(err)
	}
	c.Status(http.StatusNoContent)
}

func getEntries(c *gin.Context) {
	var entries []models.Food
	var err error

	date := strings.TrimPrefix(c.Param("date"), "/")

	if date != "" {
		after := c.Query("after")
		if after == "yes" {
			entries, err = gdb.GetEntriesAfter(date)
		} else {
			entries, err = gdb.SelectEntriesByDate(date)
		}
	} else {
		entries, err = gdb.SelectEntries()
	}
	check.IfError(err)

	c.JSON(http.StatusOK, entries)
}

func addEntry(c *gin.Context) {
	var entry models.Food

	err := c.ShouldBind(&entry)

	if !check.IfError(err) && entry.Name != "" {

		if entry.Date == "" {
			entry.Date = time.Now().Format("2006-01-02")
		}

		err = gdb.UpdateEntry(entry)
		check.IfError(err)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"ok": false})
	}
}
