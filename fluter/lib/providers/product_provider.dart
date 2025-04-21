import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/product.dart';
import '../services/product_service.dart';

// Provider for ProductService
final productServiceProvider = Provider<ProductService>((ref) {
  return ProductService();
});

// FutureProvider for fetching products
final productsProvider = FutureProvider<List<Product>>((ref) async {
  final service = ref.read(productServiceProvider);
  return service.fetchProducts();
});
