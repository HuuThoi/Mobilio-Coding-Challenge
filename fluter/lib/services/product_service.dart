import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/product.dart';

String baseUrl = dotenv.env['BASE_URL'] ?? '';

class ProductService {
  final Dio _dio = Dio();
  final String apiUrl = "$baseUrl/api/v1/products";

  Future<List<Product>> fetchProducts() async {
    final response = await _dio.get(apiUrl);
    log('data: $response');

    if (response.statusCode == 200) {
      final data = response.data['data']['data'] as List;
      return data.map((json) => Product.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load products');
    }
  }

  Future<void> addProduct(String name, int price) async {
    await _dio.post(apiUrl, data: {'name': name, 'price': price});
  }
}
