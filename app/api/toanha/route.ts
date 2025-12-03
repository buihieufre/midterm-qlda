import { NextRequest, NextResponse } from 'next/server';
import ToaNhaService from '@/usecases/ToaNhaService';
import ToaNhaRepository from '@/infrastructure/repositories/ToaNhaRepository';

// Initialize service with repository
const toaNhaRepository = new ToaNhaRepository();
const toaNhaService = new ToaNhaService(toaNhaRepository);

/**
 * GET /api/toanha
 * Lấy tất cả ToaNha
 */
export async function GET() {
  try {
    const toaNhaList = await toaNhaService.getAllToaNha();
    return NextResponse.json({
      success: true,
      data: toaNhaList.map(tn => tn.toJSON())
    });
  } catch (error: any) {
    console.error('Error getting toa nha list:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách tòa nhà',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/toanha
 * Tạo mới ToaNha
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toadoX, toadoY } = body;

    if (toadoX === undefined || toadoX === null || toadoY === undefined || toadoY === null) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin (tọa độ X và Y)'
        },
        { status: 400 }
      );
    }

    const toaNha = await toaNhaService.createToaNha(parseFloat(toadoX), parseFloat(toadoY));
    
    return NextResponse.json({
      success: true,
      data: toaNha.toJSON(),
      message: 'Tạo tòa nhà thành công'
    }, { status: 201 });
  } catch (error: any) {
    // Log error for debugging
    console.error('Error creating toa nha:', error);
    
    // Return appropriate status code
    const statusCode = error.message?.includes('không được') || error.message?.includes('phải') 
      ? 400 
      : 500;
    
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Lỗi khi tạo tòa nhà',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}

