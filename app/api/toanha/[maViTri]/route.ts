import { NextRequest, NextResponse } from "next/server";
import ToaNhaService from "@/usecases/ToaNhaService";
import ToaNhaRepository from "@/infrastructure/repositories/ToaNhaRepository";

// Initialize service with repository
const toaNhaRepository = new ToaNhaRepository();
const toaNhaService = new ToaNhaService(toaNhaRepository);

/**
 * GET /api/toanha/[maViTri]
 * Lấy ToaNha theo maViTri
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { maViTri: string } }
) {
  try {
    const maViTri = parseInt(params.maViTri);
    const toaNha = await toaNhaService.getToaNhaByMaViTri(maViTri);

    if (!toaNha) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy tòa nhà",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: toaNha.toJSON(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Lỗi khi lấy thông tin tòa nhà",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/toanha/[maViTri]
 * Cập nhật ToaNha
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { maViTri: string } }
) {
  try {
    const maViTri = parseFloat(params.maViTri);
    const body = await request.json();
    const { toadoX, toadoY } = body;

    if (
      toadoX === undefined ||
      toadoX === null ||
      toadoY === undefined ||
      toadoY === null
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng điền đầy đủ thông tin (tọa độ X và Y)",
        },
        { status: 400 }
      );
    }

    const toaNha = await toaNhaService.updateToaNha(
      maViTri,
      parseFloat(toadoX),
      parseFloat(toadoY)
    );

    return NextResponse.json({
      success: true,
      data: toaNha.toJSON(),
      message: "Cập nhật tòa nhà thành công",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Lỗi khi cập nhật tòa nhà",
      },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/toanha/[maViTri]
 * Xóa ToaNha
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { maViTri: string } }
) {
  try {
    const maViTri = parseInt(params.maViTri);
    await toaNhaService.deleteToaNha(maViTri);

    return NextResponse.json({
      success: true,
      message: "Xóa tòa nhà thành công",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Lỗi khi xóa tòa nhà",
      },
      { status: 400 }
    );
  }
}
