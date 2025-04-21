import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/product_provider.dart';
import 'package:fluttertoast/fluttertoast.dart';

class ProductListScreen extends ConsumerWidget {
  final _nameController = TextEditingController();
  final _priceController = TextEditingController();

  void _showAddModal(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Add Product'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Product name'),
              ),
              TextField(
                controller: _priceController,
                decoration: InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.numberWithOptions(decimal: false),
                inputFormatters: [
                  FilteringTextInputFormatter.digitsOnly,
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                _nameController.clear();
                _priceController.clear();
                Navigator.of(context).pop();
              },
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final name = _nameController.text.trim();
                final price = int.tryParse(_priceController.text.trim());
                final inValidValue = name.isEmpty || price == null;
                if (!inValidValue) {
                  try {
                    await ref
                        .read(productServiceProvider)
                        .addProduct(name, price);
                    _nameController.clear();
                    _priceController.clear();
                    Navigator.of(context).pop();
                    showToast('Product added successfully!');
                    ref.refresh(productsProvider);
                  } catch (e) {
                    showToast('Error: $e', isSuccess: false);
                  }
                } else {
                  showToast('Please fill all fields', isSuccess: false);
                }
              },
              child: Text('Add'),
            ),
          ],
        );
      },
    );
  }

  void showToast(String message, {bool isSuccess = true}) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.TOP,
      timeInSecForIosWeb: 1,
      backgroundColor: isSuccess ? Colors.green : Colors.red,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsProvider);

    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ElevatedButton(
              onPressed: () => _showAddModal(context, ref),
              child: Text('Add Product'),
            ),
            SizedBox(height: 12),
            Expanded(
              child: productsAsync.when(
                data: (products) => SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: DataTable(
                    columns: const [
                      DataColumn(label: Text('Name')),
                      DataColumn(label: Text('Price')),
                    ],
                    rows: products
                        .map(
                          (p) => DataRow(
                            cells: [
                              DataCell(Text(p.name)),
                              DataCell(Text(p.price.toString())),
                            ],
                          ),
                        )
                        .toList(),
                  ),
                ),
                loading: () => Center(child: CircularProgressIndicator()),
                error: (error, _) =>
                    Center(child: Text('Error: ${error.toString()}')),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
