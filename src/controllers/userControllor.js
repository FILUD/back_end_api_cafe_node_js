// controllers/userController.js
const Member = require('../models/members');
const fs = require('fs');
const path = require('path');

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'ไม่พบไฟล์รูปภาพ' });
    }

    const memberId = req.params.id;
    const fileName = req.file.filename;

    const member = await Member.findByPk(memberId);

    if (!member) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลสมาชิก' });
    }

    const oldImage = member.profile_image;

    member.profile_image = fileName;
    await member.save();

    if (oldImage) {
      const oldImagePath = path.join(__dirname, '../public/uploads/profiles', oldImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const imageUrl = `/uploads/profiles/${fileName}`;

    res.status(200).json({
      success: true,
      message: 'อัปโหลดรูปโปรไฟล์สำเร็จ',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ',
      error: error.message
    });
  }
};

const getProfileImage = async (req, res) => {
  try {
    const memberId = req.params.id;
    
    const member = await Member.findByPk(memberId, {
      attributes: ['profile_image'] 
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลสมาชิก'
      });
    }

    const profileImage = member.profile_image;
    const imageUrl = profileImage
      ? `/uploads/profiles/${profileImage}`
      : '/images/default_profile.png';

    res.status(200).json({
      success: true,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปโปรไฟล์',
      error: error.message
    });
  }
};

module.exports = {
  uploadProfileImage,
  getProfileImage
};