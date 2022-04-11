module.exports = {
  createFarmPackage: `
    INSERT INTO package_info(
      package_name,
      farm_name,
      location,
      amount_per_unit
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
  fetchPackageById: `
    SELECT * FROM package_info  WHERE id = $1
  `,

  updatePackageStatus: `
    UPDATE package_info
    SET 
      status = $2,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `,

  fetchPackageCount: `
    SELECT COUNT(*) as total FROM package_info;
  `,

  fetchAllPackages: `
    SELECT * FROM package_info
    OFFSET $1
    LIMIT $2
  `
}