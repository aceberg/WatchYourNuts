package gdb

import (
	"github.com/aceberg/WatchYourNuts/internal/models"
)

// UpdateEntry - update or create Entry
func UpdateEntry(entry models.Food) (err error) {

	tab := db.Table("entries")
	err = tab.Save(&entry).Error

	return err
}

// DeleteEntry - delete Entry from DB
func DeleteEntry(id int) (err error) {

	tab := db.Table("entries")
	err = tab.Delete(&models.Food{}, id).Error

	return err
}

// SelectEntries - get all Entries
func SelectEntries() (entries []models.Food, err error) {

	tab := db.Table("entries")
	err = tab.Find(&entries).Error

	return entries, err
}

// SelectEntryByID - get Entry
func SelectEntryByID(id int) (entry models.Food, err error) {

	tab := db.Table("entries")
	err = tab.First(&entry, id).Error

	return entry, err
}

// SelectEntriesByDate - get all Entries by date
func SelectEntriesByDate(date string) (entries []models.Food, err error) {

	tab := db.Table("entries")
	err = tab.Where("\"DATE\" LIKE ?", date+"%").Find(&entries).Error

	return entries, err
}

// GetEntriesAfter - get Entries after date
func GetEntriesAfter(date string) (entries []models.Food, err error) {

	tab := db.Table("entries")
	err = tab.Where("date > ?", date).Order("date DESC").Find(&entries).Error

	return entries, err
}
