import {pgTable,text,uuid,integer,boolean,timestamp} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import path from "path"


export const files =pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    //basic file/folder information
    name: text("name").notNull(),
    path:text("path").notNull(), //document/project/resume
    size: integer("size").notNull(),
    type: text("type").notNull(), // hardcoded to "file" or "folder"

    //storage information
    fileUrl:text("file_url").notNull(), // URL to the file in storage
    thumbnailUrl:text("thumbnail_url"),

    // Ownership
    userId: text("user_id").notNull(), 
    parentId: uuid("parent_id"), // Parent folder ID, null for root level

    // file/folder/flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})

export const filesRelations = relations(files, ({one,many})=> ({
    parent: one(files, {
        fields: []
    })

    //relationship to child files/folder
    children: many(files)

}))
