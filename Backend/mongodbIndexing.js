// Add indexes to the Product and User schema
ProductSchema.index({ status: 1 });
UserSchema.index({ email: 1 });
