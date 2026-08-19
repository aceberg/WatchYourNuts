package api

import (
	"net/http"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/gdb"
	"github.com/aceberg/WatchYourNuts/internal/models"
)

func deleteFood(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		err := gdb.DeleteFood(id)
		check.IfError(err)
	}

	c.Status(http.StatusNoContent)
}

func getFoods(c *gin.Context) {
	allFoods, err := gdb.SelectFoods()
	check.IfError(err)

	sort.Slice(allFoods, func(i, j int) bool {
		return strings.ToLower(allFoods[i].Name) < strings.ToLower(allFoods[j].Name)
	})

	c.JSON(http.StatusOK, allFoods)
}

func addFood(c *gin.Context) {
	var food models.Food

	err := c.ShouldBind(&food)
	if !check.IfError(err) && food.Name != "" {
		err = gdb.UpdateFood(food)
		check.IfError(err)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"ok": false})
	}
}
