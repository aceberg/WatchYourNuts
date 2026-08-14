package gdb

import (
	"github.com/aceberg/WatchYourNuts/internal/models"
)

// UpdateFood - update or create Food
func UpdateFood(food models.Food) (err error) {

	tab := db.Table("foods")
	err = tab.Save(&food).Error

	return err
}

// DeleteFood - delete Food from DB
func DeleteFood(id int) (err error) {

	tab := db.Table("foods")
	err = tab.Delete(&models.Food{}, id).Error

	return err
}

// SelectFoods - get all Foods
func SelectFoods() (foods []models.Food, err error) {

	tab := db.Table("foods")
	err = tab.Find(&foods).Error

	return foods, err
}

// ToggleFoodHide changes hide
// func ToggleFoodHide(id int) (err error) {

// 	tab := db.Table("foods")
// 	err = tab.Where("id = ?", id).Update("hide", gorm.Expr("NOT hide")).Error

// 	return err
// }
